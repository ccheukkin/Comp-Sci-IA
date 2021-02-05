import { Prisma, Content, ContentType, DataType } from '@prisma/client'

type Doc = Prisma.DocGetPayload<{
    include: { packets: true }
}>

type Packet = Prisma.PacketGetPayload<{
    include: { questions: true }
}>

type Question = Prisma.QuestionGetPayload<{
    include: { contents: true, categories: true }
}>

type Category = Prisma.CategoryGetPayload<{
    include: { questions: true }
}>

export { Doc, Packet, Question, Category, Content, ContentType, DataType }