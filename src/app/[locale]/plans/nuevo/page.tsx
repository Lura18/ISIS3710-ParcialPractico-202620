"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/session";
import { createPlan } from "@/services/plans";

export default function CreatePlanPage() {
  const router = useRouter();
  const [planData, setPlanData] = useState({
    name: "",
    address: "",
    description: "",
    price: 0,
    duration: 0,
    recommendations: "",
  });
  const [message, setMessage] = useState("");

  function validatePlanData() {
    if (planData.name.trim().length < 2 || planData.name.trim().length > 50) {
      return "El nombre debe tener entre 2 y 50 caracteres.";
    }

    if (planData.price <= 0) {
      return "El precio estimado debe ser mayor a 0.";
    }

    if (!Number.isInteger(planData.duration) || planData.duration <= 0) {
      return "La duración debe ser un número entero mayor a 0.";
    }

    if (planData.description.trim().length === 0 || planData.description.trim().length >= 600) {
      return "La descripción del plan debe tener menos de 600 caracteres.";
    }

    if (planData.recommendations.trim().length > 500) {
      return "Las recomendaciones no pueden superar 500 caracteres.";
    }

    return "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationMessage = validatePlanData();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const session = getSession();
    const userId = session?.id ?? "";

    if (!userId) {
      setMessage("Debes iniciar sesión para crear un plan.");
      router.push("/auth/login");
      return;
    }

    try {
      await createPlan(
        planData.name,
        planData.description,
        planData.price,
        planData.duration,
        planData.recommendations,
        planData.address,
        "",
        userId
      );

      setMessage("Plan creado exitosamente");
      router.push("/plans");
    } catch (error) {
      const backendMessage = error instanceof Error ? error.message : "Error al crear el plan";
      setMessage(backendMessage);
      console.error(error);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setPlanData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }));
  }

  return (
    <div className="flex-1 bg-slate-50 px-24 py-16">
      <h1 className="text-5xl font-bold text-slate-900">Crear nuevo plan</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={planData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={planData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={planData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={planData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-slate-700">
            Duración (días)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={planData.duration}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="recommendations" className="block text-sm font-medium text-slate-700">
            Recomendaciones para los asistentes
          </label>
          <textarea
            id="recommendations"
            name="recommendations"
            value={planData.recommendations}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Crear plan
          </button>
        </div>
      </form>

      {message && <p className="text-sm text-red-600 mt-2">{message}</p>}
    </div>
  );
}
