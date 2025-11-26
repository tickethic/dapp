// Load environment variables from .env file and allow to use them outside next.js runtime
// Réf. https://nextjs.org/docs/pages/guides/environment-variables#loading-environment-variables
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
