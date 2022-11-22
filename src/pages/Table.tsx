import {
  FormItem,
  Input,
  ArrayTable,
  Select,
  FormLayout,
  Radio,
  FormButtonGroup,
  Submit,
} from "@formily/antd";
import { createForm } from "@formily/core";
import { createSchemaField, FormConsumer, FormProvider } from "@formily/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import moment from "moment";
import { message, Popover } from "antd";
import {
  fetchData,
  fetchDoctors,
  fetchTemplates,
  fetchTypes,
  getProgrameSetting,
} from "../mock/table";
import "../styles/table.less";

function Table() {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const expandedSchema = {
    type: "object",
    properties: {
      staffNo: {
        type: "string",
        title: "Staff No.",
        required: true,
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: { width: 184 },
        },
        "x-reactions": {
          dependencies: [".checkInType"],
          fulfill: {
            run: "$self.reset()",
          },
        },
      },
      vaccinePackage: {
        type: "string",
        title: "Vaccine Package",
        required: true,
        "x-decorator": "FormItem",
        "x-component": "Select",
        "x-component-props": {
          style: { width: 184 },
        },
        "x-reactions": {
          dependencies: [".checkInType"],
          fulfill: {
            run: "$self.reset()",
          },
        },
      },
    },
  };

  const createExpandElement = (index: number, form: any) => {
    const tr = document.querySelectorAll(".ant-table-row")[index];
    const box = document.createElement("tr");

    box.className = `ant-table-expanded-row expanded-${index}`;
    ReactDOM.createRoot(box).render(
      <td className="ant-table-cell" colSpan={99}>
        <FormProvider form={form}>
          <FormLayout
            colon={false}
            layout="vertical"
            className="expanded-layout"
          >
            <SchemaField
              basePath={`arrayTable.${index}`}
              schema={expandedSchema}
            />
          </FormLayout>
        </FormProvider>
      </td>
    );
    tr.after(box);
  };

  const onCheckInType = async (visible: boolean, $self: any, $form: any) => {
    $form.setFieldState(
      "arrayTable.column5_1",
      (state: any) =>
        (state.component[1].title = $form.values.arrayTable.some(
          ({ checkInType }: any) =>
            ["Staff Vaccine Program", "VSS Program"].includes(checkInType)
        )
          ? "Order By"
          : "Referral")
    );

    const expandedDom: any = document.querySelector(
      `tr.expanded-${$self.index}`
    );
    if (expandedDom) {
      expandedDom.style.display = visible ? "table-row" : "none";

      return;
    } else if (visible) {
      createExpandElement($self.index, $form);

      const { doctorId } = await getProgrameSetting();
      const res = await fetchTemplates();

      $self.query(".orderBy").take().value = doctorId;
      $self.query(".vaccinePackage").take().dataSource = res;
    }
  };

  const SchemaField = createSchemaField({
    components: {
      ArrayTable,
      FormItem,
      Input,
      Select,
      Radio,
    },
    scope: {
      types,
      doctors,
      moment,
      onCheckInType,
    },
  });

  const form = useMemo(
    () =>
      createForm({
        initialValues: { arrayTable: data },
      }),
    [data]
  );

  const schema = {
    type: "object",
    properties: {
      arrayTable: {
        type: "array",
        "x-decorator": "FormItem",
        "x-component": "ArrayTable",
        "x-component-props": {
          rowKey: "key",
          bordered: false,
          pagination: { pageSize: 10 },
          rowSelection: {
            type: "radio",
            onSelect: (record: any) =>
              form.values.arrayTable.forEach(
                (item: any, index: number) =>
                  (item.selected = record.key === index)
              ),
          },
        },
        items: {
          type: "object",
          properties: {
            column1: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { title: "Booking Time" },
              properties: {
                bookingTime: {
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component":
                    "{{() => moment($self.value).format('YYYY-MM-DD HH:mm')}}",
                },
              },
            },
            column2: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { title: "Attending Center" },
              properties: {
                attendingCenter: {
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "{{() => $self.value}}",
                },
              },
            },
            column3: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { title: "Attending Doctor/Therapist" },
              properties: {
                attendingDoctor: {
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "{{() => $self.value}}",
                },
              },
            },
            column4: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { title: "Check-in Type", width: 200 },
              properties: {
                checkInType: {
                  type: "string",
                  enum: "{{types}}",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-reactions": {
                    effects: ["onFieldMount", "onFieldInputValueChange"],
                    fulfill: {
                      run: "onCheckInType(['Staff Vaccine Program', 'VSS Program'].includes($self.value), $self, $form)",
                    },
                  },
                },
              },
            },
            column5_1: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { width: 200 },
              properties: {
                referral: {
                  type: "string",
                  enum: [
                    { value: "CUMC Doctor" },
                    { value: "External Doctor" },
                    { value: "HA" },
                    { value: "N/A" },
                    { value: "Corporate" },
                  ],
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-reactions": {
                    dependencies: [".checkInType"],
                    fulfill: {
                      schema: {
                        "x-visible":
                          "{{!['Staff Vaccine Program', 'VSS Program'].includes($deps[0])}}",
                      },
                    },
                  },
                },
                orderBy: {
                  type: "string",
                  enum: "{{doctors}}",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-reactions": {
                    dependencies: [".checkInType"],
                    fulfill: {
                      schema: {
                        "x-visible":
                          "{{['Staff Vaccine Program', 'VSS Program'].includes($deps[0])}}",
                      },
                    },
                  },
                },
              },
            },
            column6: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { width: 200 },
              "x-visible":
                "{{$values.arrayTable.some(({referral}) => ['CUMC Doctor', 'External Doctor'].includes(referral))}}",
              properties: {
                referralDoctor: {
                  type: "string",
                  enum: "{{doctors}}",
                  "x-decorator": "FormItem",
                  "x-reactions": [
                    {
                      dependencies: [".referral"],
                      fulfill: {
                        run: `const newCpt = {'CUMC Doctor': 'Select', 'External Doctor': 'Input'}[$deps[0]];
                              $self.component[0] && newCpt && $self.reset();
                              $self.component = [newCpt]`,
                      },
                    },
                  ],
                },
              },
            },
            column7: {
              type: "void",
              "x-component": "ArrayTable.Column",
              "x-component-props": { title: "Appt Remarks", width: 200 },
              properties: {
                apptRemarks: {
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": (props: any) => (
                    <Popover content={props.value}>
                      <Input {...props} />
                    </Popover>
                  ),
                },
              },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    (async () => {
      const res = await fetchData();

      if (res.length > 0) {
        const [types, doctors] = await Promise.all([
          fetchTypes(),
          fetchDoctors(),
        ]);

        setTypes(types as any);
        setDoctors(doctors as any);
        setData(res.map((item, index) => ({ ...item, key: index })) as any);
      }
    })();
  }, []);

  return (
    <FormProvider form={form}>
      <FormConsumer>
        {(_form) => {
          const selected = _form.values.arrayTable.find(
            (item: any) => item.selected
          );

          return (
            <>
              <SchemaField schema={schema} />
              <FormButtonGroup.Sticky align="center">
                <FormButtonGroup>
                  <Submit
                    disabled={!selected}
                    onClick={async () => {
                      await _form.validate(`arrayTable.${selected.key}.*`);

                      message.success(
                        <div>
                          <div style={{ marginBottom: 24 }}>提交成功</div>
                          <code style={{ textAlign: "left" }}>
                            当前入参:
                            <pre>{JSON.stringify(selected, null, 2)}</pre>
                          </code>
                        </div>
                      );
                    }}
                  >
                    Next
                  </Submit>
                </FormButtonGroup>
              </FormButtonGroup.Sticky>
              <code>
                当前数据:
                <pre>{JSON.stringify(_form.values, null, 2)}</pre>
              </code>
            </>
          );
        }}
      </FormConsumer>
    </FormProvider>
  );
}

export default Table;
