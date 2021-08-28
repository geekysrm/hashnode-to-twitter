import styles from "../styles/Preview.module.css";
import {
  RetweetOutlined,
  HeartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { FiChevronDown } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import getTodaysDate from "../utils/getTodaysDate";

const MainTweet = ({ tweet, user }) => {
  const { date, time } = getTodaysDate();
  return (
    <div className={`${styles.tweet} -mt-6 main-tweet`}>
      <div
        className={`${styles.tweetContainer} ${styles.pb} ${styles.pr} ${styles.pl}`}
      >
        <div className={`${styles.user} ${styles.pr}`}>
          <img src={user.picture} />
          <div className={`${styles.username}`}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.handle}>@${user.nickname}</div>
          </div>
          <i className={`${styles.materialIcons}`}>
            <FiChevronDown />
          </i>
        </div>
        <div className={`${styles.tweetContent} ${styles.pt}`}>{tweet}</div>

        <div className={`${styles.date} ${styles.pt} ${styles.pb}`}>
          <span className={styles.dateTime}>
            {time} • {date}
          </span>{" "}
          • <span className={styles.dateTime}>hashnode-to-twitter</span>
        </div>
        <div className={`${styles.rl} ${styles.pt} ${styles.pb}`}>
          <div className={styles.retweets}>
            <b>10.5K</b> Retweets
          </div>
          <div className={styles.likes}>
            <b>21.2K</b> Likes
          </div>
        </div>
      </div>
      <div className={`${styles.icons} flex justify-center items-center`}>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <BiMessageRounded />
        </div>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <RetweetOutlined />
        </div>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <HeartOutlined />
        </div>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <MailOutlined />
        </div>
      </div>
    </div>
  );
};

export default MainTweet;
