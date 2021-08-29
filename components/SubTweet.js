import styles from "../styles/Preview.module.css";
import { FiChevronDown } from "react-icons/fi";
import Reply from "./icons/Reply";
import Retweet from "./icons/Retweet";
import Share from "./icons/Share";
import Like from "./icons/Like";

const SubTweet = ({ tweet, user }) => {
  return (
    <div>
      <div className={`${styles.wrap} ${styles.pt}`}>
        <div className={styles.box}>
          <div className={styles.line}>
            <div className={styles.border} />
            <img className={styles.avatar} src={user.picture} />
          </div>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={`${styles.userinfo} ${styles.sl}`}>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.handle}>@{user.nickname}</div>
                <div className={`${styles.time}`}>
                  <span> • </span>
                  <span className={styles.dateTime}>2m</span>
                </div>
              </div>
              <i className={styles.materialIcons}>
                <FiChevronDown />
              </i>
            </div>

            {/* <div className={`${styles.subtweetContent} ${styles.sl}`}>
              {tweet}
            </div> */}
            <div
              className={`${styles.subtweetContent} ${styles.sl}`}
              dangerouslySetInnerHTML={{
                __html: tweet,
              }}
            />

            <div className={`${styles.icons} flex justify-center items-center`}>
              <div className={`${styles.ico} reply-icon`}>
                <Reply className="h-5 fill-current" />
              </div>
              <div className={`${styles.ico} retweet-icon`}>
                <Retweet className="h-5 fill-current" />
              </div>
              <div className={`${styles.ico} heart-icon`}>
                <Like className="h-5 fill-current" />
              </div>
              <div className={`${styles.ico} dm-icon`}>
                <Share className="h-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubTweet;
