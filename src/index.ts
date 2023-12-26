import express, { Express, Request, Response } from "express"
import dotenv from 'dotenv'

const app: Express = express()
const port = process.env.PORT || 3000