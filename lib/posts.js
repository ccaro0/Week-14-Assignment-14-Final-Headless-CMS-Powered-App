import got from 'got';

const API_BASE =
  'https://dev-cs-55-13-fall-2026.pantheonsite.io/wp-json/twentytwentyone-child/v1';

const nameKeys = {
  especialidades: 'especialidad_name',
  medicos: 'doctor_name',
  servicios: 'service_name',
};

async function fetchPosts(type) {
  try {
    const response = await got(`${API_BASE}/${type}`);
    const data = JSON.parse(response.body);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

function displayName(item, type) {
  const nameKey = nameKeys[type];
  return item[nameKey] || item.post_title || 'Untitled';
}

export async function getSortedList(type) {
  const posts = await fetchPosts(type);

  return posts
    .map((item) => ({
      id: item.ID.toString(),
      name: displayName(item, type),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllIds(type) {
  const posts = await fetchPosts(type);

  return posts.map((item) => ({
    params: {
      id: item.ID.toString(),
    },
  }));
}

export async function getData(type, idRequested) {
  const posts = await fetchPosts(type);
  const match = posts.find(
    (item) => item.ID.toString() === idRequested.toString()
  );

  return match || null;
}
