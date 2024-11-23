import React, { useState } from "react";
import { District, Loc } from "../types/interface";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as DownT } from "../assets/triangle.svg";

type Props = {
  selectedDistrict: string;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>;
  setMapCenter: React.Dispatch<React.SetStateAction<Loc>>;
  changeMapLevel: (level: number) => void;
};

const DISTRICTS: Readonly<District[]> = [
  { name: "유성구", center: { lat: 36.36405586, lng: 127.356163 } },
  { name: "동구", center: { lat: 36.31204028, lng: 127.4548596 } },
  { name: "중구", center: { lat: 36.32582989, lng: 127.421381 } },
  { name: "서구", center: { lat: 36.35707299, lng: 127.3834158 } },
  { name: "대덕구", center: { lat: 36.35218384, lng: 127.4170933 } },
];

function KakaoMapDropDown(props: Props) {
  const [isDropDownOpen, setDropdown] = useState<boolean>(false);

  const onDropDownClick = () => {
    setDropdown(!isDropDownOpen);
  };

  const onDistrictMenuClick = (updatedDistrict: District) => () => {
    props.setSelectedDistrict(updatedDistrict.name);
    props.setMapCenter(updatedDistrict.center);
    props.changeMapLevel(6);
    setDropdown(false);
  };

  return (
    <>
      <div
        className="absolute flex flex-row z-10 w-[59.183673vw] md:w-[12.083vw] h-[5.2816901vh] md:h-[4.167vh] left-[3.307vw] top-[0.926vh] rounded-md cursor-pointer shadow-lg bg-white top-[2vh]"
        style={{
          outline: isDropDownOpen ? "3px solid #364F85" : "none",
          outlineOffset: "-1px",
        }}
        onClick={onDropDownClick}
      >
        <div className="flex justify-center items-center w-[7.6335vw] md:w-[3vw] h-[5.2816901vh] md:h-[4.167vh] rounded-l-md bg-white">
          <Logo className="h-[3.5211268vh] md:h-[2.78vh]" />
        </div>
        <div className="flex items-center w-[48vw] md:w-[9.083vw] h-[5.2816901vh] md:h-[4.167vh] rounded-r-sm bg-white">
          <p className="text-sm text-slate-500">{props.selectedDistrict}</p>
          <DownT className="absolute w-[3.0612245vw] md:w-[0.625vw] right-[3vw]" />
        </div>
      </div>
      {isDropDownOpen && (
        <div className="absolute z-10 w-[59.183673vw] md:w-[12.083vw] left-[3.307vw] top-[8.3149vh] bg-white rounded-md shadow-lg">
          <ul className="bg-white rounded-md">
            {DISTRICTS.map((district, index) => (
              <li
                className="px-4 py-2 text-sm text-slate-500 hover:rounded-t-sm hover:bg-[#5D799F] hover:text-white cursor-pointer"
                key={index}
                onClick={onDistrictMenuClick(district)}
              >
                {district.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default KakaoMapDropDown;
