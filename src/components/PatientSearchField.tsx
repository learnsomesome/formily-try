import { FormConsumer } from "@formily/react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Input } from "@formily/antd";

function PatientSearchField() {
  return (
    <FormConsumer>
      {(form) => (
        <>
          <Input
            style={{ width: 240 }}
            suffix={
              <SearchOutlined
                onClick={() => {
                  form.setValuesIn("patientInfo.surname", "Stephen");
                  form.setValuesIn("patientInfo.givenName", "Curry");
                  form.setValuesIn("patientInfo.sex", "M");
                }}
              />
            }
            onPressEnter={(e: any) => {
              form.setValuesIn("patientInfo.surname", "Stephen");
              form.setValuesIn("patientInfo.givenName", "Curry");
              form.setValuesIn("patientInfo.sex", "M");
            }}
          />
          <Button
            onClick={() =>
              form.reset(
                "*(patientInfo.surname,patientInfo.givenName,patientInfo.sex)"
              )
            }
            style={{ marginLeft: 8 }}
          >
            Reset
          </Button>
        </>
      )}
    </FormConsumer>
  );
}

export default PatientSearchField;
