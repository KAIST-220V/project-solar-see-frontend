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
        className="absolute left-[3.307vw] top-[2vh] z-10 flex h-[5.2816901vh] w-[59.183673vw] cursor-pointer flex-row rounded-lg bg-white shadow-lg"
        style={{
          outline: isDropDownOpen ? "3px solid #364F85" : "none",
          outlineOffset: "-1px",
        }}
        onClick={onDropDownClick}
      >
        <div className="ml-2 flex h-[5.2816901vh] w-[7.6335vw] items-center justify-center">
          <Logo className="h-[3.5211268vh]" />
        </div>
        <div className="ml-2 flex h-[5.2816901vh] w-[48vw] items-center rounded-r-lg bg-white">
          <p className="text-sm font-bold text-slate-500">
            {props.selectedDistrict}
          </p>
          <DownT className="absolute right-[3vw] w-[3.0612245vw]" />
        </div>
      </div>
      {isDropDownOpen && (
        <div className="absolute left-[3.307vw] top-[8.3149vh] z-10 w-[59.183673vw] rounded-lg bg-white shadow-lg">
          <ul className="rounded-lg bg-white">
            {DISTRICTS.map((district, index) => (
              <li
                className="cursor-pointer px-4 py-2 text-sm text-slate-500 hover:rounded-lg hover:bg-[#5D799F] hover:text-white"
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
