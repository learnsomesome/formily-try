import { FormConsumer } from "@formily/react";
import { Button } from "antd";
import moment from "moment";

function PhotoTakField({ value }: { value: string }) {
  return (
    <FormConsumer>
      {(form) => (
        <>
          {value && (
            <>
              <img src={value} alt="photo" style={{ width: 24, height: 24 }} />
              <span style={{ margin: "0 12px" }}>
                Taken on | {moment().format("YYYY-DD-MM HH:mm")}
              </span>
            </>
          )}
          <Button
            onClick={() =>
              form.setValuesIn("patientInfo.photo", "/src/assets/curry.png")
            }
          >
            Take Photo
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            disabled={!value}
            onClick={() => form.reset("patientInfo.photo")}
          >
            Remove Photo
          </Button>
        </>
      )}
    </FormConsumer>
  );
}

export default PhotoTakField;
