import {
  profilePerson,
  star,
  link,
  preferences,
  settingIcon,
  calender,
  helpIcon,
  logoutIcon,
} from "../../public";

export const menuItems = [{ text: "Dashboard", link: "/" }];

export const aboveItems = [
  { src: profilePerson, alt: "profilePerson", text: "Profile" },
  { src: star, alt: "star", text: "Branding" },
  { src: link, alt: "link", text: "My Link" },
  { src: preferences, alt: "preferences", text: "Login Preferences" },
  { src: settingIcon, alt: "settingIcon", text: "Cookie Settings" },
  { src: calender, alt: "calender", text: "Calender sync" },
];

export const belowItems = [
  { src: helpIcon, alt: "helpIcon", text: "Help" },
  { src: logoutIcon, alt: "logoutIcon", text: "Logout" },
];
const languageOptions = ["English", "Urdu", "Hindi", "French"];
const dateFormatOptions = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"];
const timeFormatOptions = ["12h (am/pm)", "24h (am/pm)"];

const countryOptions = [
  "Pakistan",
  "India",
  "Afghanistan",
  "Albania",
  "Algeria",
];
const timezoneOptions = [
  "Pakistan, Maldives Time",
  "India Standard Time",
  "Afghanistan Standard Time",
  "Albania Standard Time",
  "Algeria Standard Time",
];

const mapOptions = (options: string[]) => {
  return options.map((option) => ({
    value: option,
    label: option,
  }));
};

export const languageItems = mapOptions(languageOptions);
export const dateFormatItems = mapOptions(dateFormatOptions);
export const timeFormatItems = mapOptions(timeFormatOptions);
export const countryItems = mapOptions(countryOptions);
export const timezoneItems = mapOptions(timezoneOptions);
