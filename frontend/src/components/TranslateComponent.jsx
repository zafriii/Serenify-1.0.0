// import React, { useEffect, useRef } from 'react';
// import './translate.css'


// const TranslateComponent = () => {
//   const googleTranslateRef = useRef(null);

//   useEffect(() => {
//     if (!document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
//       const script = document.createElement('script');
//       script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       document.body.appendChild(script);
//     }

//     window.googleTranslateElementInit = () => {
//       if (!googleTranslateRef.current.firstChild) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,fr,es,de,it,bn,hi',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//             autoDisplay: false,
//           },
//           googleTranslateRef.current
//         );
//       }
//     };

//     const customizeDropdownLanguage = () => {
//       const translateCombo = document.querySelector('.goog-te-combo');
//       if (translateCombo) {
//         translateCombo.setAttribute('lang', 'en'); // Set the dropdown's language attribute to English

//         // If the dropdown text is still in Bengali, force the language by re-initializing its options
//         [...translateCombo.options].forEach(option => {
//           option.textContent = option.value; // Set the text to the language codes or names
//         });
//       }
//     };

//     // Remove the hash fragment when translation is changed or page is loaded
//     const clearHash = () => {
//       if (window.location.hash) {
//         window.location.hash = ''; // Remove the hash fragment
//       }
//     };

//     setTimeout(customizeDropdownLanguage, 1500);
//     window.addEventListener('hashchange', clearHash); // Listen for hash change event

//     return () => {
//       const existingScript = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
//       if (existingScript) {
//         document.body.removeChild(existingScript);
//       }
//       window.removeEventListener('hashchange', clearHash); // Clean up event listener
//     };
//   }, []);

//   return <div ref={googleTranslateRef}></div>;
// };

// export default TranslateComponent;



















import React, { useEffect, useRef } from 'react';
import './translate.css';

const TranslateComponent = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    // Load Google Translate script if not already loaded
    if (!document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
      const script = document.createElement('script');
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    // Initialize Google Translate widget
    window.googleTranslateElementInit = () => {
      if (!googleTranslateRef.current.firstChild) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,de,it,bn,hi',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          googleTranslateRef.current
        );
      }
    };

    // Customize dropdown language options
    const customizeDropdownLanguage = () => {
      const translateCombo = document.querySelector('.goog-te-combo');
      if (translateCombo) {
        translateCombo.setAttribute('lang', 'en'); // Set dropdown's language attribute to English
        [...translateCombo.options].forEach(option => {
          option.textContent = option.value; // Reset text to language codes or names
        });
      }
    };

    // Remove the hash from the URL if it appears
    const clearHash = () => {
      if (window.location.hash && window.location.hash.startsWith('#googtrans')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    // Monitor for hash changes and clear them
    const handleHashChange = () => {
      clearHash();
    };

    setTimeout(customizeDropdownLanguage, 1500);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      const existingScript = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return <div ref={googleTranslateRef}></div>;
};

export default TranslateComponent;
