import {
    INewRelease,
    IRanking,
    IShowcase,
    ISong3,
    ITop100,
    ITopic,
    ITopicEvent,
    IVideo,
} from '.';

export interface HomeData {
    status: string;
    newRelease: INewRelease;
    ranking: IRanking;
    showcase: IShowcase[];
    song: ISong3[];
    top100: ITop100[];
    topic: ITopic[];
    topicEvent: ITopicEvent[];
    video: IVideo[];
    clientIp: string;
    time: number;
}
