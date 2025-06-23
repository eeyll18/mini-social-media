export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BASE_URL_FROM_ENV = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL_FROM_ENV) {
  throw new Error(
    "BASE_URL ortam değişkeni ayarlanmamış. Lütfen .env dosyanızı kontrol edin veya değişkeni ayarlayın."
  );
}

const BASE_URL: string = BASE_URL_FROM_ENV;

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all news:", error);
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(
        `Failed to fetch news item ${id}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching news by id ${id}:`, error);
    return null;
  }
}

export async function createPost(postData: Omit<Post, "id" | "createdAt">) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...postData,
        createdAt: new Date().toISOString(),
      }),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating news:", error);
    return null;
  }
}

export async function updatePost(
  id: string,
  postData: Partial<Omit<Post, "id" | "createdAt">>
): Promise<Post | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  } catch (error) {
    console.error(`Error updating news ${id}:`, error);
    return null;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete news ${id}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting news ${id}:`, error);
    return false;
  }
}
