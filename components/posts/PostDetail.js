import classes from "./PostDetail.module.css";
export default function PostDetail(props) {
  return (
    <section className={classes.detail}>
      <img
        src={props.image}
        alt={props.title} />
      <h1>{props.title}</h1>
      <summary>{props.summary}</summary>
      <p>{props.description}</p>
    </section>
  )
}