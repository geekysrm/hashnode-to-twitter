import styles from "../styles/Preview.module.css";
import { FiChevronDown } from "react-icons/fi";
import getTodaysDate from "../utils/getTodaysDate";
import Reply from "./icons/Reply";
import Retweet from "./icons/Retweet";
import Share from "./icons/Share";
import Like from "./icons/Like";
import ImagePreview from "./ImagePreview";
import twemoji from "twemoji";

const MainTweet = ({ tweet: oldTweet, user, lastLink }) => {
  const tweet = twemoji.parse(oldTweet);
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
            <div className={styles.handle}>@{user.nickname}</div>
          </div>
          <i className={`${styles.materialIcons}`}>
            <FiChevronDown />
          </i>
        </div>
        <div
          className={`${styles.tweetContent} ${styles.pt}`}
          dangerouslySetInnerHTML={{
            __html: tweet,
          }}
        />
        <ImagePreview link={lastLink} />
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
          <Reply className="h-5 fill-current" />
        </div>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <Retweet className="h-5 fill-current" />
        </div>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <Like className="h-5 fill-current" />
        </div>
        <div className={`${styles.ico} flex items-center justify-center`}>
          <Share className="h-5 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default MainTweet;
