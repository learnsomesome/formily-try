import { ArrayItems } from "@formily/antd";
import { Button } from "antd";

function CustomRemove({ onRemove }: any) {
  const array = ArrayItems.useArray?.();
  const index = ArrayItems.useIndex?.();

  return (
    <Button danger onClick={() => onRemove(index, array)}>
      Delete
    </Button>
  );
}

export default CustomRemove;
