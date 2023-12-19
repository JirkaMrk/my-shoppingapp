import React from 'react';

function NotFoundPage(props) {   // komponenta pro zobrazení stránky s chybovou hláškou

    const isEnglish = props.isEnglish;

    const translations = {
        notFound: {
          en: 'Page not found, go back to home page',
          cs: 'Stránka nenalezena, vraťte se na domovskou stránku',
        }
    };
    return (
        <div className="d-flex justify-content-center">
            <h1>{`${translations.notFound[isEnglish ? 'en' : 'cs']}`}</h1>
        </div>
    );
}

export default NotFoundPage;
