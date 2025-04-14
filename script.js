const API_KEY = '15ec4ea091634c7399383522251404';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const landmarksContainer = document.getElementById('landmarks-container');
const attractionsContainer = document.getElementById('attractions-container');

// 날씨 상태에 따른 아이콘 설정
function getWeatherIcon(condition, temp, humidity) {
    // 비 관련 조건
    if (condition.toLowerCase().includes('rain') || 
        condition.toLowerCase().includes('drizzle') || 
        condition.toLowerCase().includes('shower')) {
        return 'https://cdn-icons-png.flaticon.com/512/414/414927.png'; // 물방울 아이콘
    }
    
    // 습도가 높은 경우 (70% 이상)
    if (humidity >= 70) {
        return 'https://cdn-icons-png.flaticon.com/512/414/414927.png'; // 물방울 아이콘
    }
    
    // 더운 경우 (25도 이상)
    if (temp >= 25) {
        return 'https://cdn-icons-png.flaticon.com/512/869/869869.png'; // 해 아이콘
    }
    
    // 기본 날씨 아이콘
    return 'https://cdn-icons-png.flaticon.com/512/414/414929.png';
}

// 도시별 랜드마크 데이터
const landmarksData = {
    'Seoul': [
        {
            name: '남산서울타워',
            description: '서울의 상징적인 타워로, 전망대와 사랑의 자물쇠로 유명합니다.',
            image: 'https://images.unsplash.com/photo-1538485399081-7c8ed30c6135?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: '경복궁',
            description: '조선시대의 법궁으로, 한국의 전통 건축미를 보여주는 대표적인 궁궐입니다.',
            image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: '북촌한옥마을',
            description: '전통 한옥이 잘 보존된 지역으로, 한국의 전통문화를 체험할 수 있습니다.',
            image: 'https://images.unsplash.com/photo-1538485399081-7c8ed30c6135?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ],
    'Tokyo': [
        {
            name: '도쿄스카이트리',
            description: '일본에서 가장 높은 타워로, 도쿄의 전망을 즐길 수 있습니다.',
            image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: '센소지',
            description: '도쿄에서 가장 오래된 불교 사원으로, 일본의 전통문화를 느낄 수 있습니다.',
            image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: '시부야 스크램블 교차로',
            description: '세계에서 가장 붐비는 횡단보도로, 도쿄의 현대적인 면모를 보여줍니다.',
            image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ],
    'Paris': [
        {
            name: '에펠탑',
            description: '파리의 상징적인 철탑으로, 세계적으로 유명한 관광지입니다.',
            image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: '루브르 박물관',
            description: '세계에서 가장 큰 미술관으로, 모나리자를 비롯한 수많은 예술작품이 전시되어 있습니다.',
            image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: '노트르담 대성당',
            description: '고딕 건축의 걸작으로, 파리의 역사와 문화를 대표하는 건축물입니다.',
            image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ]
};

// 도시별 구경거리 데이터
const attractionsData = {
    'Seoul': [
        {
            name: '명동',
            description: '서울의 대표적인 쇼핑 거리로, 패션, 뷰티, 음식 등 다양한 상점이 밀집해 있습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 10시 ~ 오후 10시'
        },
        {
            name: '인사동',
            description: '전통 문화의 중심지로, 골동품, 서예, 전통 공예품 등을 구매할 수 있습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 9시 ~ 오후 6시'
        },
        {
            name: '홍대 거리',
            description: '젊은이들의 문화 중심지로, 카페, 클럽, 공연장, 독특한 상점들이 많습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '24시간'
        }
    ],
    'Tokyo': [
        {
            name: '아키하바라',
            description: '일본의 전자제품과 애니메이션 문화의 중심지로, 다양한 전자상가와 만화카페가 있습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 10시 ~ 오후 8시'
        },
        {
            name: '하라주쿠',
            description: '젊은이들의 패션 중심지로, 독특한 의상과 액세서리를 판매하는 상점이 많습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 10시 ~ 오후 8시'
        },
        {
            name: '츠키지 외부 시장',
            description: '일본의 신선한 해산물과 식재료를 판매하는 시장으로, 다양한 일본 음식을 맛볼 수 있습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 5시 ~ 오후 2시'
        }
    ],
    'Paris': [
        {
            name: '샹젤리제 거리',
            description: '파리의 대표적인 쇼핑 거리로, 고급 브랜드 매장과 카페가 즐비합니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 10시 ~ 오후 8시'
        },
        {
            name: '몽마르트',
            description: '예술가들의 거리로, 다양한 갤러리와 카페, 그리고 파리의 전망을 즐길 수 있습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '24시간'
        },
        {
            name: '라틴 쿼터',
            description: '학생과 지식인들의 거리로, 서점, 카페, 레스토랑이 많으며 활기찬 분위기를 느낄 수 있습니다.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            time: '오전 9시 ~ 오후 11시'
        }
    ]
};

function displayLandmarks(city) {
    landmarksContainer.innerHTML = '';
    const landmarks = landmarksData[city] || [];
    
    if (landmarks.length === 0) {
        landmarksContainer.innerHTML = '<p class="no-landmarks">이 도시의 랜드마크 정보가 없습니다.</p>';
        return;
    }

    landmarks.forEach(landmark => {
        const landmarkCard = document.createElement('div');
        landmarkCard.className = 'landmark-card';
        landmarkCard.innerHTML = `
            <img src="${landmark.image}" alt="${landmark.name}" class="landmark-image">
            <h4 class="landmark-name">${landmark.name}</h4>
            <p class="landmark-description">${landmark.description}</p>
        `;
        landmarksContainer.appendChild(landmarkCard);
    });
}

function displayAttractions(city) {
    attractionsContainer.innerHTML = '';
    const attractions = attractionsData[city] || [];
    
    if (attractions.length === 0) {
        attractionsContainer.innerHTML = '<p class="no-attractions">이 도시의 구경거리 정보가 없습니다.</p>';
        return;
    }

    attractions.forEach(attraction => {
        const attractionCard = document.createElement('div');
        attractionCard.className = 'attraction-card';
        attractionCard.innerHTML = `
            <img src="${attraction.icon}" alt="${attraction.name}" class="attraction-icon">
            <h4 class="attraction-name">${attraction.name}</h4>
            <p class="attraction-description">${attraction.description}</p>
            <div class="attraction-time">${attraction.time}</div>
        `;
        attractionsContainer.appendChild(attractionCard);
    });
}

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();

        if (data.error) {
            alert('도시를 찾을 수 없습니다. 다시 시도해주세요.');
            return;
        }

        // 날씨 정보 업데이트
        cityName.textContent = data.location.name;
        temp.textContent = data.current.temp_c;
        weatherDesc.textContent = data.current.condition.text;
        
        // 날씨 상태에 따른 아이콘 설정
        weatherIcon.src = getWeatherIcon(
            data.current.condition.text,
            data.current.temp_c,
            data.current.humidity
        );
        
        humidity.textContent = data.current.humidity;
        windSpeed.textContent = data.current.wind_kph;

        // 랜드마크 정보 표시
        displayLandmarks(city);
        
        // 구경거리 정보 표시
        displayAttractions(city);

    } catch (error) {
        console.error('날씨 정보를 가져오는데 실패했습니다:', error);
        alert('날씨 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
    }
}

// 검색 버튼 클릭 이벤트
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('도시 이름을 입력해주세요.');
    }
});

// Enter 키 입력 이벤트
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('도시 이름을 입력해주세요.');
        }
    }
});
