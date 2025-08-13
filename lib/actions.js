'use server';
import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function shareMeal(prevState,formData) {
    'use server';
    const meal = {
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
    }

    if(!meal.creator || !meal.creator_email || !meal.title || !meal.summary || !meal.instructions || !meal.image) {
        return {
            status: 400,
            message: 'Missing required fields'
        }
    }
    await saveMeal(meal);
    revalidatePath("/meals") // prevents the loading from cache; so that the latest data will be fetched after the below redirect
    redirect("/meals")
}