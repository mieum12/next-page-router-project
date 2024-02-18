import Card from '../ui/Card';
import classes from './PostItem.module.css';
import {useRouter} from "next/router";

function PostItem(props) {
  // 프로그램 방식의 네비게이트
  // useRouter를 호출하고 router 객체의 액세스를 얻는다
  // router 객체는 프로그래밍 방식 네이게이션 동작에 사용한다
  // router 객체는 동적 페이지 url의 일부인 데이터에 대한 엑세스를 얻을 수 있는 query 프로퍼티 뿐 아니라
  // 네비게이션을 위한 메서드도 이용 가능하다
  // 예를들면 push(페이지 스택에 새 페이지 푸쉬, Link와 동일)
  const router = useRouter()
  function showDetailHandler() {
    router.push('/' + props.id)
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default PostItem;