import { Author } from "../../App";
import { Tag } from "../Tag/Tag";
import Style from "./style.module.css";

export type propsCard = {
  id: number;
  titulo: string;
  descripcion: string;
  autor_id: number;
  Author: Author | undefined;
};

export const Card = ({ titulo, descripcion, autor_id, Author }: propsCard) => {
  console.log("Card => ", titulo);
  return (
    <div className={Style.Card}>
      <div className={Style.Header}>
        <div className={Style.title}>{titulo}</div>
        <Tag author_id={autor_id} />
      </div>
      <div className={Style.Body}>
        <div className={Style.authorName}>{Author?.nombres}</div>
        <div className={Style.description}>{descripcion}</div>
      </div>
      <div className={Style.Footer}>
        <button className={Style.buttonShowBook}>SHOW BOOK</button>
      </div>
    </div>
  );
};
