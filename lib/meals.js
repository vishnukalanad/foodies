import sql from "better-sqlite3"
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db=sql("meals.db")
export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // throw new Error("Error, failed to get meals")
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
    const slug = slugify(meal.title, {lower: true})
    const instructions = xss(meal.instructions)

    const ext = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${ext}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer()
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error("Failed to save image")
        }
    })

    meal.image = `/images/${fileName}`
    meal.slug = slug

    db.prepare(`INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)`).run(meal)

}