import Link from "./icons/Link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ImagePreview({ link }) {
  console.log(link);
  if (!link || !link.includes("http")) {
    return <></>;
  }
  const [ogpData, setOgpData] = useState(null);

  console.log({ ogpData });

  useEffect(() => {
    axios
      .post("/api/fetchOgp", { url: link })
      .then((res) => {
        const { data } = res;
        console.log(data);
        if (data) {
          setOgpData(data.ogp);
        }
      })
      .catch((err) => setOgpData(null));
  }, []);

  useEffect(() => {
    axios.post("/api/fetchOgp", { url: link }).then((res) => {
      const { data } = res;
      console.log(data);
      if (data) {
        setOgpData(data.ogp);
      }
    });
  }, [link]);

  let title = "",
    description = "",
    imageUrl = "";
  if (ogpData) {
    title = ogpData?.twitter_card?.title || ogpData.title;
    description = ogpData?.twitter_card?.description || ogpData.description;
    if (description?.length >= 100) {
      description = description.substring(0, 95) + "...";
    }
    imageUrl =
      ogpData?.twitter_card?.images[0]?.url ||
      ogpData?.open_graph?.images[0]?.url ||
      "";
  }
  return ogpData && imageUrl ? (
    <div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        style={{ textDecoration: "none" }}
      >
        <div className="overflow-hidden border-t border-l border-r rounded-xl">
          <img className="border-b" src={imageUrl} />
          <div className="p-4 text-black bg-white border border-t-0 border-gray-200 rounded-b-xl hover:bg-gray-100">
            <p>{title}</p>
            <p className="text-gray-600">{description}</p>
            <p className="flex items-center text-gray-600">
              <span>
                <Link className="h-4 mr-1 fill-current" />
              </span>
              <p className="overflow-hidden overflow-ellipsis">{link}</p>
            </p>
          </div>
        </div>
      </a>
    </div>
  ) : (
    <></>
  );
}
