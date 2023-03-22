import { execSync } from "child_process";


const hello = () => execSync('ls', {stdio: 'inherit'})
hello()
