import Link from "./icons/Link";

export default function ImagePreview() {
  return (
    <div>
      <a
        href="https://google.com"
        target="_blank"
        rel="noreferrer noopener"
        style={{ textDecoration: "none" }}
      >
        <div className="overflow-hidden rounded-xl">
          <img className="" src="https://placekitten.com/g/564/295" />
          <div className="p-4 text-black bg-white border border-t-0 border-gray-200 rounded-b-xl hover:bg-gray-100">
            <p>Soumya Ranjan Mohanty's Dev Blog</p>
            <p className="text-gray-600">Soumya Ranjan Mohanty's Dev Blog</p>
            <p className="flex items-center text-gray-600">
              <span>
                <Link className="h-4 mr-1 fill-current" />
              </span>
              <span>https://geekysrm.hashnode.dev</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
