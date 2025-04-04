import Style from "./style.module.css";

export const Tag = ({ author_id }: { author_id: number }) => {
  return <div className={Style.tag}>AUTHORID: {author_id}</div>;
};
