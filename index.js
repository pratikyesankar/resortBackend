const express = require("express")
const app = express()
const cors = require("cors")

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

const { initializeDatabase } = require("./db/db.connect")
const Resort = require("./models/resort.models")

app.use(express.json())

initializeDatabase()

//------------------------------------------------------------------------------------------------------------------------------------
// Post a New Resort
async function createResort(newResort) {
  try {
    const resort = new Resort(newResort)
    const savedResort = await resort.save()
    return savedResort
  } catch (error) {
    throw error
  }
}

app.post("/resorts", async (req, res) => {
  try {
    const savedResort = await createResort(req.body)
    res
      .status(201)
      .json({ message: "Resort added successfully.", resort: savedResort })
  } catch (error) {
    res.status(500).json({ error: "Failed to add resort" })
  }
})

//------------------------------------------------------------------------------------------------------------------------------------
// Get All Resorts
async function readAllResorts() {
  try {
    const allResorts = await Resort.find()
    return allResorts
  } catch (error) {
    console.log(error)
    throw error
  }
}
app.get("/resorts", async (req, res) => {
  try {
    const resorts = await readAllResorts()
    if (resorts.length != 0) {
      res.json(resorts)
    } else {
      res.json({ error: "No resorts found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resorts." })
  }
})

//------------------------------------------------------------------------------------------------------------------------------------
// Delete a Resort
async function deleteResort(resortId) {
  try {
    const deletedResort = await Resort.findByIdAndDelete(resortId)
    return deletedResort
  } catch (error) {
    console.log(error)
    throw error
  }
}

app.delete("/resorts/:resortId", async (req, res) => {
  try {
    const deletedResort = await deleteResort(req.params.resortId)
    if (deletedResort) {
      res.status(200).json({ message: "Resort deleted successfully." })
    } else {
      res.status(404).json({ error: "Resort not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resort." })
  }
})

//------------------------------------------------------------------------------------------------------------------------------------
// Get Resort by Name
async function readResortByName(resortName) {
  try {
    const resort = await Resort.findOne({ name: resortName })
    return resort
  } catch (error) {
    throw error
  }
}

app.get("/resorts/:name", async (req, res) => {
  try {
    const resort = await readResortByName(req.params.name)
    if (resort) {
      res.status(200).json(resort)
    } else {
      res.status(404).json({ error: "Resort not found." })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resort." })
  }
})

//------------------------------------------------------------------------------------------------------------------------------------
// Update Resort details
async function updateResort(resortId, dataToUpdate) {
  try {
    const updatedResort = await Resort.findByIdAndUpdate(
      resortId,
      dataToUpdate,
      {
        new: true,
      }
    )
    return updatedResort
  } catch (error) {
    console.log("Error in updating Resort details", error)
    throw error
  }
}

app.post("/resorts/:resortId", async (req, res) => {
  try {
    const updatedResort = await updateResort(req.params.resortId, req.body)
    if (updatedResort) {
      res.status(200).json({
        message: "Resort updated successfully.",
        updatedResort: updatedResort,
      })
    } else {
      res.status(404).json({ error: "Resort not found." })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update resort." })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
