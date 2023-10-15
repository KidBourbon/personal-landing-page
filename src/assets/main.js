const api =
	'https://youtube-v31.p.rapidapi.com/search?channelId=UCUVv_L27fI0xbvdScYOGm2A&part=snippet%2Cid&order=date&maxResults=10';

const content = document.getElementById('content') || null;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd191218006mshc565652500bc4ccp17492cjsnec0b6f2feb4b',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	},
};

async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = response.json();
	return data;
}

(async () => {
	try {
		const videos = await fetchData(api);

		let view = videos.items
			.map(
				(video) => `
    <div class="group relative">
      <div
        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
      >
        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
      </div>
      <div class="mt-4 flex justify-between">
        <h3 class="text-sm text-gray-700">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${video.snippet.title}
        </h3>
      </div>
    </div>`
			)
			.slice(0, 7)
			.join('');

		content.innerHTML = view;
	} catch (error) {
		console.log(error);
	}
})();
