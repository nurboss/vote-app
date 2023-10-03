import React from "react";
import img_1 from "../assets/জনাব আব্দু রহমান বদির.jpg";
import img_2 from "../assets/জনাব মোঃ ইসহাক.jpg";
import img_3 from "../assets/জনাব  শাহজাহান চৌধুরী.jpg";
import img_4 from "../assets/জনাবা শাহিনা আক্তার.jpg";

const VoteCard = ({ onIncrement, member, disable }) => {
  const mathcImg = (name) => {
    switch (name) {
      case "জনাব আব্দু রহমান বদির":
        return img_1;
      case `জনাব মোঃ ইসহাক`:
        return img_2;
      case "জনাব শাহজাহান চৌধুরী":
        return img_3;
      case "জনাবা শাহিনা আক্তার":
        return img_4;
    }
  };
  console.log(disable);

  return (
    <div className="flex justify-between items-center gap-5">
      <div className="w-[50px] h-[50px]  sm:w-[100px] sm:h-[100px] rounded-md overflow-hidden bg-slate-200">
        <img
          src={mathcImg(member.img_name)}
          alt={member.name}
          className="object-cover"
        />
      </div>
      <h2 className="w-28">{member.name}</h2>
      <p className="">{member.count}</p>
      {!disable && (
        <button
          onClick={() => onIncrement(member._id)}
          className={`bg-purple-700 text-white py-2 px-3 sm:px-4 rounded cursor-pointer transition-transform active:scale-95`}
          disabled={disable}
        >
          ভোট দিন
        </button>
      )}
    </div>
  );
};

export default VoteCard;
