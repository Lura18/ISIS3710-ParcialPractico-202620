import { getSession } from "./session";

// La URL del back se configura en el archivo .env
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Así viene cada plan en la lista que manda el back
export type PlanSummary = {
  id: string;
  name: string;
  likes: number;
  estimatedPrice: number;
  address: string;
  image: string;
  creator: {
    id: string;
    name: string;
  };
};

// Así viene un plan cuando se pide su detalle
export type Plan = {
  id: string;
  name: string;
  likes: number;
  estimatedPrice: number;
  address: string;
  image: string;
  description: string;
  estimatedTime: number; // en minutos
  recomendations: string;
  creator?: {
    userName: string;
    name: string;
  };
};

// Pide al back la lista de todos los planes
export async function getPlans(): Promise<PlanSummary[]> {
  const response = await fetch(`${API_URL}/plans`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los planes");
  }

  return response.json();
}

// Pide al back el detalle de un plan. Si no existe devuelve null
export async function getPlan(id: string): Promise<Plan | null> {
  const response = await fetch(`${API_URL}/plans/${id}`, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("No se pudo cargar el plan");
  }

  return response.json();
}

// Le da "me gusta" a un plan en nombre del usuario
export async function likePlan(planId: string, userId: string) {
  const response = await fetch(`${API_URL}/plans/${planId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "No se pudo dar me gusta");
  }
}

// Crea un nuevo plan en el back
//debe tener los mismos campos que un plan, excepto id, likes y creator, que son generados por el back
export async function createPlan(
  name: string,
  description: string,
  estimatedPrice: number,
  estimatedTime: number,
  recomendations: string,
  address: string,
  image: string,
  userId: string
) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80";

  const safeImage = image && /^https?:\/\//i.test(image) ? image : fallbackImage;

  const response = await fetch(`${API_URL}/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      estimatedPrice,
      estimatedTime,
      recomendations,
      address,
      image: safeImage,
      userId,
    }),
  });

  if (!response.ok) {
    let message = "No se pudo crear el plan";

    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch {
      const text = await response.text();
      if (text) message = text;
    }

    throw new Error(message);
  }

  return response.status === 204 ? null : response.json();
}