import styles from "../styles/Preview.module.css";
import {
  RetweetOutlined,
  HeartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { FiChevronDown } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import getTodaysDate from "../utils/getTodaysDate";

const MainTweet = ({ tweet }) => {
  const { date, time } = getTodaysDate();
  return (
    <div className={`${styles.tweet}`}>
      <div
        className={`${styles.tweetContainer} ${styles.pb} ${styles.pr} ${styles.pl}`}
      >
        <div className={`${styles.user} ${styles.pr}`}>
          <img src="https://github.com/geekysrm.png" />
          <div className={`${styles.username}`}>
            <div className={styles.name}>Soumya</div>
            <div className={styles.handle}>@geekysrm</div>
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
            <b>15.4K</b> Retweets
          </div>
          <div className={styles.likes}>
            <b>20.9K</b> Likes
          </div>
        </div>
      </div>
      <div className={styles.icons}>
        <div className={styles.ico}>
          <BiMessageRounded />
        </div>
        <div className={styles.ico}>
          <RetweetOutlined />
        </div>
        <div className={styles.ico}>
          <HeartOutlined />
        </div>
        <div className={styles.ico}>
          <MailOutlined />
        </div>
      </div>
    </div>
  );
};

export default MainTweet;
