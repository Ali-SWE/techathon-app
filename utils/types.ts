export type Doc = {
    id: string
    documentName: string
    description: string
    category: string
    expiryDate: string // should type be date?
    imageBase64: string
    size: string
    mimeType: string
}