export default function Dashboard(props) {
  const { userPending } = props;

  return (
    <>
      <div className="bg-[#003049] w-full h-full">
        <div className="max-w-[1240px] mx-auto px-4 ">
          {userPending ? (
            <>
              <div className="pt-4">
                <h1 className="pt-4 text-3xl font-bold text-white">
                  Welcome to your personal Crypto trading platform.
                </h1>
                <h2 className="pt-4 text-xl text-slate-400">
                  Your account is currently pending approval. You will receive
                  an email once it is approved.
                </h2>
              </div>{" "}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
