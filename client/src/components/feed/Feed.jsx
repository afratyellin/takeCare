import React, { useEffect, useState } from 'react';
import { checkLogin, getLoggedInUser } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Feed() {
    const { t } = useTranslation();
    const [loginUser, setLoginUser] = useState({id:"", role:""});
  const navigate = useNavigate();

  //check user login
  useEffect(() => {
    if (!checkLogin()) {
        navigate('/login');
        return;
      }
  }, [navigate]);
  
    return (
        <div>
            <h1 className='headline'> {t("search")}</h1>
        </div>
    )
}