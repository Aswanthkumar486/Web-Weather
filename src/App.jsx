import React, { useState, useEffect } from 'react';

export default function App() {
  const API_KEY = "2d30e2f8ad022716b9049f2ebd661e0a";
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Weather images mapping
  const getWeatherImage = (condition) => {
    const images = {
      Clear: 'https://img.freepik.com/premium-photo/panorama-blue-sky-with-white-clouds-clear-weather_1046379-2210.jpg',
      Clouds: 'https://wallup.net/wp-content/uploads/2017/03/15/100005-clouds.jpg',
      Rain: 'https://i.ytimg.com/vi/RR4qALfav5w/maxresdefault.jpg ',
      Snow: 'https://freedesignfile.com/upload/2016/12/Winter-snow-pine-trees-sun-Stock-Photo.jpg',
      Thunderstorm: 'https://wallup.net/wp-content/uploads/2019/09/953241-lightning-storm-rain-clouds-sky-nature-thunderstorm.jpg',
      Drizzle: 'https://img.freepik.com/premium-photo/drizzle-dazzle-rain-weather_960396-82623.jpg',
      Mist: 'https://th.bing.com/th/id/R.d3350ea76c3accb1ede4337b95d2dae6?rik=LlWFu6%2bxKr%2fvIw&riu=http%3a%2f%2fclipground.com%2fimages%2fdeep-mist-clipart-15.jpg&ehk=NvOJolyh0xlOwLjifERbE08UZ63DKVOIWTjcizpTxhY%3d&risl=&pid=ImgRaw&r=0',
      Smoke: 'https://static.albertafarmexpress.ca/wp-content/uploads/2023/05/09103206/2023-05-16T222908Z_176849535_RC2UZ0A6VYZB_RTRMADP_3_CANADA-WEATHER-WILDFIRES-1.jpeg',
      Haze: 'https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/f059d118-ad3d-4ef8-8b0f-430bfe349210/Rendition/low-res/Content/Public',
      Fog: 'https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/fog-on-a-country-road.jpg',
      Dust: 'https://www.innovationnewsnetwork.com/wp-content/uploads/2023/01/%C2%A9-shutterstockKelly-vanDellen_2084839012.jpg',
      Sand: 'https://thumbs.dreamstime.com/b/arid-climate-sand-dunes-beauty-nature-generated-ai-arid-climate-sand-dunes-beauty-nature-generated-artificial-275670618.jpg',
      Ash: 'https://as2.ftcdn.net/v2/jpg/04/66/46/99/1000_F_466469951_sEGsyNOu7wjunHJrirnqFg91GteYrHw3.jpg',
      Squall: 'https://d3jnxtdvt30e72.cloudfront.net/wp-content/uploads/2018/09/September-squall-RachaelBaker-web.jpg',
      Tornado: 'https://images.nationalgeographic.org/image/upload/v1638892275/EducationHub/photos/tornado-on-a-plain.jpg'
    };

    return images[condition] || 'default.jpg';
  };

  const fetchWeather = () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError('');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setWeather(null);
        setIsLoading(false);
      });
  };

  // Format time from timestamp

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className="container py-4 min-vh-100"

    > 
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg animate__animated animate__fadeIn">
            <div className="card-header  text-white">


              <h2 className="text-center mb-0" >
              <i class="bi bi-cloud-drizzle-fill me-1"></i>
                Weather Forecast

              </h2>
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
            <div className="input-container">
  <input
    type="text"
    name="text"
    className="input"
    placeholder="Search city..."
    value={city}
    onChange={(e) => setCity(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
  />
  <span className="icon" onClick={fetchWeather} style={{ cursor: 'pointer' }}>
    {/* Optional: show loader while fetching */}
    {isLoading ? (
      <div className="spinner-border spinner-border-sm text-primary"></div>
    ) : (
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
        <path opacity="1" d="M14 5H20" stroke="#007bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path opacity="1" d="M14 8H17" stroke="#007bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#007bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path opacity="1" d="M22 22L20 20" stroke="#007bff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
</div>

              </div>
              {/* loading data to display */}
              {isLoading && (
                <div className="d-flex justify-content-center my-5">
                  <div className="custom-loader"></div>
                </div>
              )}

              {weather && (
                <div className="animate__animated animate__fadeInUp text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  <div className="row">
                    {/* Left Panel - Main Weather Info */}
                    <div className="col-md-5 border-end">
                      <div className="text-center p-3">
                        <h2 className="display-2 fw-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#f1c40f', textShadow: '2px 2px 8px #000' }}>
                          {Math.round(weather.main.temp)}°C
                        </h2>
                        <h3 className="mb-3" style={{ color: '#00d1b2', fontWeight: '600', textShadow: '1px 1px 4px #000' }}>
                          {weather.name}, {weather.sys.country}
                        </h3>

                        <div className="my-4">
                          <img
                            src={getWeatherImage(weather.weather[0].main)}
                            alt="Weather"
                            className="img-fluid rounded-circle shadow"
                            style={{ width: '200px', height: '200px', objectFit: 'cover', border: '4px solid hsla(0, 100.00%, 1.40%, 1.00)' }}
                          />
                        </div>

                        <h4 className="text-capitalize mt-3" style={{ color: '#f39c12', fontWeight: 'bold' }}>
                          {weather.weather[0].description}
                        </h4>

                        <div className="mt-4" style={{ color: 'black' }}>
                          <p className="fs-5">
                            <i className="bi bi-calendar me-2 text-info"></i>
                            <span style={{ fontWeight: 600,color:'whitesmoke' }}>{new Date().toLocaleDateString()}</span>
                          </p>
                          <p className="fs-5">
                            <i className="bi bi-clock me-2 text-danger"></i>
                            <span style={{ fontWeight: 600, color:'whitesmoke' }}>{currentTime}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Weather Details (kept your details-card layout as-is, assumed CSS is applied) */}
                    <div className="col-md-6">
                      <div className="h-100 d-flex flex-column justify-content-center">
                        <div className="row g-3">

                          {/* Humidity */}
                          <div className="col-6">
                            <div className="card details-card text-center">
                              <div className="border"></div>
                              <div className="content">
                                <div className="logo">
                                  <i className="bi bi-droplet fs-1 text-primary"></i>
                                  <span className="trail"></span>
                                </div>
                                <span className="logo-bottom-text">Humidity</span>
                                <p className="fs-5 mb-5" style={{ color: '#ffffff', fontWeight: '600', fontFamily: 'Quicksand' }}>
                                  {weather.main.humidity}%
                                </p>
                              </div>
                              <span className="bottom-text">Moisture</span>
                            </div>
                          </div>

                          {/* Wind Speed */}
                          <div className="col-6">
                            <div className="card details-card text-center">
                              <div className="border"></div>
                              <div className="content">
                                <div className="logo">
                                  <i className="bi bi-wind fs-1 text-info"></i>
                                  <span className="trail"></span>
                                </div>
                                <span className="logo-bottom-text">Wind</span>
                                <p className="fs-5 mb-5" style={{ color: '#ffffff', fontWeight: '600', fontFamily: 'Quicksand' }}>
                                  {weather.wind.speed} m/s
                                </p>
                              </div>
                              <span className="bottom-text">Breeze</span>
                            </div>
                          </div>

                          {/* Sunrise */}
                          <div className="col-6">
                            <div className="card details-card text-center">
                              <div className="border"></div>
                              <div className="content">
                                <div className="logo">
                                  <i className="bi bi-sunrise fs-1 text-warning"></i>
                                  <span className="trail"></span>
                                </div>
                                <span className="logo-bottom-text">Sunrise</span>
                                <p className="fs-5 mb-5" style={{ color: '#ffffff', fontWeight: '600', fontFamily: 'Quicksand' }}>
                                  {formatTime(weather.sys.sunrise)}
                                </p>
                              </div>
                              <span className="bottom-text">Morning</span>
                            </div>
                          </div>

                          {/* Sunset */}
                          <div className="col-6">
                            <div className="card details-card text-center">
                              <div className="border"></div>
                              <div className="content">
                                <div className="logo">
                                  <i className="bi bi-sunset fs-1 text-danger"></i>
                                  <span className="trail"></span>
                                </div>
                                <span className="logo-bottom-text">Sunset</span>
                                <p className="fs-5 mb-5" style={{ color: '#ffffff', fontWeight: '600', fontFamily: 'Quicksand' }}>
                                  {formatTime(weather.sys.sunset)}
                                </p>
                              </div>
                              <span className="bottom-text">Evening</span>
                            </div>
                          </div>

                          {/* Min Temp */}
                          <div className="col-6">
                            <div className="card details-card text-center">
                              <div className="border"></div>
                              <div className="content">
                                <div className="logo">
                                  <i className="bi bi-thermometer-low fs-1 text-secondary"></i>
                                  <span className="trail"></span>
                                </div>
                                <span className="logo-bottom-text">Min Temp</span>
                                <p className="fs-5 mb-5" style={{ color: '#ffffff', fontWeight: '600', fontFamily: 'Quicksand' }}>
                                  {Math.round(weather.main.temp_min)}°C
                                </p>
                              </div>
                              <span className="bottom-text">Low</span>
                            </div>
                          </div>

                          {/* Max Temp */}
                          <div className="col-6">
                            <div className="card details-card text-center">
                              <div className="border"></div>
                              <div className="content">
                                <div className="logo">
                                  <i className="bi bi-thermometer-high fs-1 text-danger"></i>
                                  <span className="trail"></span>
                                </div>
                                <span className="logo-bottom-text">Max Temp</span>
                                <p className="fs-5 mb-5" style={{ color: '#ffffff', fontWeight: '600', fontFamily: 'Quicksand' }}>
                                  {Math.round(weather.main.temp_max)}°C
                                </p>
                              </div>
                              <span className="bottom-text">High</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}