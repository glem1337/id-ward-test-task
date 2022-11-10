//your code goes here
(async function () {
  const currentScript = document.currentScript;
  const userId = currentScript.attributes.user.value;

  const browserName = (function (agent) {
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'MS Edge';
      case agent.indexOf('edg/') > -1:
        return 'Edge ( chromium based)';
      case agent.indexOf('opr') > -1 && !!window.opr:
        return 'Opera';
      case agent.indexOf('chrome') > -1 && !!window.chrome:
        return 'Chrome';
      case agent.indexOf('trident') > -1:
        return 'MS IE';
      case agent.indexOf('firefox') > -1:
        return 'Mozilla Firefox';
      case agent.indexOf('safari') > -1:
        return 'Safari';
      default:
        return 'other';
    }
  })(window.navigator.userAgent.toLowerCase());

  const getUserLocation = async () => {
    const response = await fetch(
      `https://geolocation-db.com/json/c5544c60-581f-11ed-b302-a99a705cf413`,
    );

    return await response.json();
  };

  const location = await getUserLocation();

  window.addEventListener('beforeunload', () => {
    const body = JSON.stringify({
      userId: userId,
      date: new Date(),
      url: window.location.href,
      uag: browserName,
      uag_lang: navigator.language || navigator.userLanguage,
      location,
    });

    fetch('https://putsreq.herokuapp.com/ylG2esx9EkW77PmdnsUI', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      keepalive: true,
    });
  });
})();
