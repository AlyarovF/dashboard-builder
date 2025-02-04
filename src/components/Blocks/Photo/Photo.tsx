import { FC } from "react";
import { PhotoProps } from "../../../common/types/blocks";

const Photo: FC<PhotoProps> = (props) => {
  return (
    <img
      {...props}
      loading="eager"
      style={{
        minWidth: 150,
        minHeight: 150,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default Photo;
