export interface ITopic {
    title: string;
    key: string;
    backgroundColor: string;
    description: string;
    coverImageURL: string;
    thumbURL: string;
}

export interface ITopicCover {
    title: string;
    key: string;
    backgroundColor: string;
    description: string;
    coverImageURL: string;
    thumbURL: string;
}

export interface ITopics {
    status: string;
    topic: ITopic[];
    topicCover: ITopicCover[];
    clientIp: string;
    time: number;
}
