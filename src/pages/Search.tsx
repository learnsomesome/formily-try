import { useEffect, useMemo, useState } from "react";
import { createForm, onFieldInputValueChange } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/react";
import { FormItem, FormLayout, Input, Select, DatePicker } from "@formily/antd";
import { SearchOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import moment from "moment";

const initParams = {
  pageNumber: 1,
  pageSize: 10,
  centre: "EMC24",
  visitDate: [moment(), moment()],
};

function Search() {
  const [params, setParams] = useState(initParams);

  const SchemaField = createSchemaField({
    components: {
      Input,
      Select,
      FormItem,
      FormLayout,
      DatePicker,
    },
  });

  const onFieldsChange = () => {
    setParams((pre) => ({
      ...pre,
      ...form.getFormState().values,
      pageNumber: 1,
    }));
  };

  const form = useMemo(
    () =>
      createForm({
        initialValues: initParams,
        effects() {
          onFieldInputValueChange("*(!searchKey)", onFieldsChange);
        },
      }),
    []
  );

  const schema = {
    type: "object",
    properties: {
      searchKey: {
        type: "string",
        title: "Patient Search",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: { width: 240 },
          suffix: <SearchOutlined onClick={onFieldsChange} />,
          placeholder: "CUMC NO./Name/Tel/Doc No.",
          onPressEnter: onFieldsChange,
        },
      },
      centre: {
        type: "string",
        title: "Centre",
        enum: [
          { label: "All", value: "" },
          { label: "EYC", value: "EYC" },
          { label: "EMC24", value: "EMC24" },
        ],
        "x-decorator": "FormItem",
        "x-decorator-props": {
          style: { marginLeft: 12 },
        },
        "x-component": "Select",
        "x-component-props": {
          style: { width: 120 },
        },
      },
      visitDate: {
        type: "array",
        title: "Visit Date",
        "x-decorator": "FormItem",
        "x-decorator-props": {
          style: { marginLeft: 12 },
        },
        "x-component": "DatePicker.RangePicker",
      },
    },
  };

  useEffect(() => {
    message.success("数据更新");
  }, [params]);

  return (
    <div>
      <section>
        <FormProvider form={form}>
          <FormLayout layout="inline">
            <SchemaField schema={schema} />
          </FormLayout>
        </FormProvider>
        <code>
          当前入参: <pre>{JSON.stringify(params, null, 2)}</pre>
        </code>
        <Table
          dataSource={[]}
          columns={[]}
          pagination={{
            showSizeChanger: false,
            current: params.pageNumber,
            pageSize: params.pageSize,
            total: 30,
            onChange: (page) =>
              setParams((pre) => ({ ...pre, pageNumber: page })),
          }}
        />
      </section>
    </div>
  );
}

export default Search;
