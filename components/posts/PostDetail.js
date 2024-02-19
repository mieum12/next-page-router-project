import classes from "./PostDetail.module.css";
import Image from "next/image";
export default function PostDetail(props) {
  return (
    <section className={classes.detail}>
      <Image
        className='images'
        src={props.image}
        alt={props.title}
        width={500}
        height={600}
      />
      <h1>{props.title}</h1>
      <summary>{props.summary}</summary>
      <p>{props.description}</p>
    </section>
  )
}