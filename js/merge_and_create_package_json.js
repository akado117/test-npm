#!/usr/bin/env node

const fs = require('fs')

const templateName = "package-template.json"

function getPackagePath() {
    const flagIndex = process.argv.findIndex(arg => arg == "-d" || arg == "--directory")
    return process.argv[flagIndex + 1]
}

function mergeAndSortByKey(parent, child, key) {
    const mergedObject = Object.assign({}, parent[key], child[key])

    const sortedObject = {}
    Object.keys(mergedObject).sort().forEach(subkey => sortedObject[subkey] = mergedObject[subkey])
    return sortedObject;
}

function mergeJsons(parent, child) {
    const keysToMerge = ["scripts", "dependencies", "devDependencies"]

    keysToMerge.forEach(key => {
        child[key] = mergeAndSortByKey(parent, child, key)
    })

    return child
}

async function readParentTemplate() {
    return new Promise((res, rej) => {
        fs.readFile(`package.json`, (err, data) => err && rej(err) || res(JSON.parse(data)))
    })
}

async function readTemplate(path) {
    return new Promise((res, rej) => {
        fs.readFile(`${path}/${templateName}`, (err, data) => err && rej(err) || res(JSON.parse(data)))
    })
}

function createPackageJSON(data, path) {
    fs.writeFileSync(`${path}/package.json`, JSON.stringify(data, '', 2))
}


async function main() {
    const templatePath = getPackagePath()

    if (fs.existsSync(`${templatePath}/${templateName}`)) {
        console.log(`Creating package.json for ${templatePath}`)
        const [parent, child] = await Promise.all([readParentTemplate(), readTemplate(templatePath)])
        const mergedTemplate = mergeJsons(parent, child)
        createPackageJSON(mergedTemplate, templatePath)
        console.log('Created package.json\n')
    } else {
        console.log(`Unable to create package.json. Please verify ${templatePath} has a ${templateName}\n`)
    }
}


main()