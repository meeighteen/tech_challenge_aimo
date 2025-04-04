import { Author } from "../../App";
import { Tag } from "../Tag/Tag";
import Style from "./style.module.css";

type propsCard = {
  id: number;
  title: string;
  description: string;
  author_id: number;
  author: Author | undefined;
};

export const Card = ({
  id,
  title,
  description,
  author_id,
  author,
}: propsCard) => {
  return (
    <div key={id} className={Style.Card}>
      <div className={Style.Header}>
        <div className={Style.title}>{title}</div>
        <Tag author_id={author_id} />
      </div>
      <div className={Style.Body}>
        <div className={Style.authorName}>{author?.nombres}</div>
        <div className={Style.description}>{description}</div>
      </div>
      <div className={Style.Footer}>
        <button className={Style.buttonShowBook}>SHOW BOOK</button>
      </div>
    </div>
  );
};
