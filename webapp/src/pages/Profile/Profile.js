import { useTranslation } from "react-i18next";

const Profile = () => {

  //Translation
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("profile.title")}</h1>
      <p>TODO</p>
    </div>
  );
};

export default Profile;
