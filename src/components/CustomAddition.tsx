import { ArrayItems } from "@formily/antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function CustomAddition({ onAddition }: any) {
  const array = ArrayItems.useArray?.();

  return (
    <Button
      icon={<PlusOutlined />}
      type="dashed"
      onClick={() => onAddition(array)}
    >
      Add New Contact
    </Button>
  );
}

export default CustomAddition;
