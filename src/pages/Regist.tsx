import {
  FormButtonGroup,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
  Submit,
  Checkbox,
  FormTab,
  ArrayItems,
} from "@formily/antd";
import { createForm } from "@formily/core";
import {
  createSchemaField,
  Field,
  FormConsumer,
  FormProvider,
} from "@formily/react";
import { InputNumber, message } from "antd";
import CustomAddition from "../components/CustomAddition";
import CustomRemove from "../components/CustomRemove";
import PatientSearchField from "../components/PatientSearchField";
import PhotoTakField from "../components/PhotoTakeField";
import "../styles/regist.less";

function Regist() {
  const SchemaField = createSchemaField({
    components: {
      FormItem,
      FormGrid,
      FormTab,
      ArrayItems,
      Input,
      InputNumber,
      Select,
      Checkbox,
      PhotoTakField,
      PatientSearchField,
      CustomAddition,
      CustomRemove,
    },
  });

  const form = createForm({
    initialValues: {
      contactInfo: {
        residentialAddress: {
          same: true,
        },
      },
      emergency: [{ priority: 1 }],
    },
  });
  const formTab = FormTab.createFormTab();

  const patientInfoSchema = {
    type: "object",
    properties: {
      photo: {
        type: "string",
        title: "Photo",
        "x-decorator": "FormItem",
        "x-decorator-props": {
          gridSpan: "{{$self.value ? 2 : 1}}",
        },
        "x-component": "PhotoTakField",
      },
      patientSearch: {
        type: "void",
        title: "Patient Search",
        "x-decorator": "FormItem",
        "x-decorator-props": {
          gridSpan: "{{$values.patientInfo.photo ? 1 : 2}}",
        },
        "x-component": "PatientSearchField",
      },
      surname: {
        type: "string",
        title: "Surname",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: { width: 240 },
        },
        "x-reactions": {
          dependencies: [".singleName"],
          fulfill: {
            state: {
              required: "{{!$deps[0]}}",
            },
            run: "($deps[0] || $self.value) && $self.setFeedback([])",
          },
        },
      },
      givenNamewrapper: {
        type: "void",
        "x-decorator": "FormItem",
        properties: {
          givenName: {
            type: "string",
            required: true,
            title: "Given Name",
            "x-decorator": "FormItem",
            "x-decorator-props": {
              style: { display: "inline-flex" },
              colon: false,
              labelWidth: 100,
            },
            "x-component": "Input",
            "x-component-props": {
              style: { width: 240 },
            },
          },
          singleName: {
            type: "boolean",
            "x-component": (props: any) => (
              <Checkbox {...props}>Single Name</Checkbox>
            ),
            "x-component-props": {
              style: { marginLeft: 8 },
            },
            "x-reactions": {
              dependencies: [".surname", ".givenName"],
              when: "{{$deps[0] && $deps[1]}}",
              fulfill: {
                state: {
                  disabled: true,
                  value: false,
                },
              },
              otherwise: {
                state: {
                  disabled: false,
                },
              },
            },
          },
        },
      },
      sex: {
        type: "string",
        title: "Date of Birth",
        enum: [
          { label: "Male", value: "M" },
          { label: "Female", value: "F" },
          { label: "Unknown sex", value: "U" },
        ],
        "x-decorator": "FormItem",
        "x-component": "Select",
        "x-component-props": {
          style: { width: 240 },
        },
      },
    },
  };

  const addressSharedSchema = {
    type: "void",
    "x-component": "FormGrid",
    "x-component-props": {
      maxColumns: 3,
    },
    properties: {
      room: {
        type: "string",
        title: "Room",
        required: true,
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: { width: 240 },
        },
      },
      floor: {
        type: "string",
        title: "Floor",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: { width: 240 },
        },
      },
      block: {
        type: "string",
        title: "Block",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: { width: 240 },
        },
      },
    },
  };

  const contactInfoSchema = {
    type: "object",
    properties: {
      grid: {
        type: "void",
        "x-component": "FormGrid",
        "x-component-props": {
          maxColumns: 2,
        },
        properties: {
          telMobile: {
            type: "string",
            title: "Tel (Mobile)",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              style: { width: 240 },
            },
          },
          telHome: {
            type: "string",
            title: "Tel (Home)",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              style: { width: 240 },
            },
          },
        },
      },
      correspondenceAddress: {
        type: "object",
        "x-decorator": (props: any) => (
          <>
            <h3>Correspondence Address</h3>
            {props.children}
          </>
        ),
        properties: { grid: addressSharedSchema },
      },
      residentialAddress: {
        type: "object",
        "x-decorator": (props: any) => (
          <>
            <h3>
              Residential Address
              <Field
                name="same"
                component={[
                  () => (
                    <Checkbox style={{ marginLeft: 12 }}>
                      Same as Correspondence Address
                    </Checkbox>
                  ),
                ]}
              />
            </h3>
            {props.children}
          </>
        ),
        properties: {
          grid: {
            ...addressSharedSchema,
            "x-reactions": {
              dependencies: [".same"],
              fulfill: {
                schema: {
                  "x-visible": "{{!$deps[0]}}",
                },
                run: "$deps[0] && $form.reset('contactInfo.residentialAddress')",
              },
            },
          },
        },
      },
    },
  };

  const emergencyItemSchema = {
    type: "void",
    "x-component": "FormGrid",
    "x-component-props": {
      maxColumns: 3,
    },
    properties: {
      priority: {
        type: "number",
        title: "Priority",
        required: true,
        "x-decorator": "FormItem",
        "x-component": "InputNumber",
        "x-component-props": {
          style: { width: 240 },
          min: 1,
          precision: 0,
        },
      },
      contactType: {
        type: "string",
        title: "Type",
        required: true,
        enum: ["Both", "Emergency Contact", "Next-of-kin"],
        "x-decorator": "FormItem",
        "x-component": "Select",
        "x-component-props": {
          style: { width: 240 },
        },
      },
      proxyAccess: {
        type: "string",
        title: "Proxy Access to Patient App",
        enum: ["Not Applicable", "3-Month Only", "Until Revoked"],
        "x-decorator": "FormItem",
        "x-component": "Select",
        "x-component-props": {
          style: { width: 240 },
          showSearch: true,
        },
        "x-reactions": {
          dependencies: [".contactType"],
          fulfill: {
            state: {
              disabled: "{{!$deps[0] || $deps[0] === 'Emergency Contact'}}",
            },
            run: "(!$deps[0] || $deps[0] === 'Emergency Contact') && $self.reset()",
          },
        },
      },
      surname: patientInfoSchema.properties.surname,
      givenNamewrapper: patientInfoSchema.properties.givenNamewrapper,
      remove: {
        type: "void",
        "x-decorator": "FormItem",
        "x-component": "CustomRemove",
        "x-component-props": {
          onRemove: (index: number, array: any) => array.field.remove(index),
        },
        "x-visible": "{{$values.emergency.length > 1}}",
      },
    },
  };

  const schema = {
    type: "object",
    properties: {
      grid: {
        type: "void",
        "x-component": "FormGrid",
        "x-component-props": {
          maxColumns: 3,
        },
        "x-decorator": (props: any) => (
          <>
            <h3>Patient Information</h3>
            {props.children}
          </>
        ),
        properties: {
          patientInfo: patientInfoSchema,
        },
      },
      collapse: {
        type: "void",
        "x-component": "FormTab",
        "x-component-props": {
          formTab: "{{formTab}}",
        },
        properties: {
          tab1: {
            type: "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              tab: "Contact Info.",
            },
            properties: {
              contactInfo: contactInfoSchema,
            },
          },
          tab2: {
            type: "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              tab: "Emergency Contact Info/Next-of-Kin",
            },
            properties: {
              emergency: {
                type: "array",
                "x-component": "ArrayItems",
                items: {
                  type: "object",
                  properties: {
                    grid: emergencyItemSchema,
                  },
                },
                properties: {
                  add: {
                    type: "void",
                    "x-decorator": "FormItem",
                    "x-decorator-props": {
                      style: { textAlign: "center" },
                    },
                    "x-component": "CustomAddition",
                    "x-component-props": {
                      onAddition: (array: any) =>
                        array.field.push({
                          priority: form.getValuesIn("emergency").length + 1,
                        }),
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <FormProvider form={form}>
        <FormLayout
          className="regist-formlayout"
          labelWrap
          colon={false}
          labelAlign="right"
          labelWidth={100}
        >
          <SchemaField schema={schema} scope={{ formTab }} />
        </FormLayout>
        <FormButtonGroup.Sticky align="center">
          <FormButtonGroup>
            <Submit
              onSubmit={console.log}
              onSubmitSuccess={() => message.success("提交成功")}
            >
              Save
            </Submit>
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
        <code>
          当前入参:{" "}
          <FormConsumer>
            {(_form) => <pre>{JSON.stringify(form.values, null, 2)}</pre>}
          </FormConsumer>
        </code>
      </FormProvider>
    </div>
  );
}

export default Regist;
