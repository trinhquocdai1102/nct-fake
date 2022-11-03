export interface IArtist {
    artistId: number;
    name: string;
    shortLink: string;
    imageUrl: string;
}

export interface IRefMapping {
    refKey: string;
    refType: string;
}

export interface ISong {
    key: string;
    title: string;
    thumbnail: string;
    duration: string;
    artists: IArtist[];
    type: string;
    dateRelease: any;
    dateCreate: any;
    uploadBy?: any;
    provider?: any;
    isMyPlaylist: boolean;
    statusViewValue: number;
    statusPlayValue: number;
    statusDownloadValue: number;
    statusAddPlaylistValue: number;
    refMapping: IRefMapping[];
    genreKey: string;
    streamUrls: any[];
    description?: any;
}

export interface INewRelease {
    song: ISong[];
    playlist: any[];
}

export interface IArtist2 {
    artistId: number;
    name: string;
    shortLink: string;
    imageUrl: string;
}

export interface ISong2 {
    title: string;
    position: number;
    oldPosition: number;
    highestPosition: number;
    totalWeekInRanked: number;
    thumbnail: string;
    artists: IArtist2[];
    songKey: string;
    viewIn24H?: any;
    duration: number;
}

export interface IRanking {
    song: ISong2[];
    week: number;
    year: number;
    key: string;
}

export interface IShowcase {
    title: string;
    key: string;
    thumbnail: string;
    url: string;
    description: string;
    order: number;
    imageUrl: string;
}

export interface IArtist3 {
    artistId: number;
    name: string;
    shortLink: string;
    imageUrl: string;
}

export interface ISong3 {
    key: string;
    title: string;
    thumbnail: string;
    duration: string;
    artists: IArtist3[];
    type: string;
    dateRelease: any;
    dateCreate: any;
    uploadBy?: any;
    provider?: any;
    isMyPlaylist: boolean;
    statusViewValue: number;
    statusPlayValue: number;
    statusDownloadValue: number;
    statusAddPlaylistValue: number;
    refMapping: any[];
    genreKey: string;
    streamUrls: any[];
    description: string;
}

export interface IArtist4 {
    artistId: number;
    name: string;
    shortLink: string;
    imageUrl: string;
}

export interface ITop100 {
    key: string;
    title: string;
    thumbnail: string;
    duration: string;
    artists: IArtist4[];
    type: string;
    dateRelease: number;
    dateCreate: any;
    uploadBy?: any;
    provider?: any;
    refMapping: any[];
    genreKey: string;
    songs?: any;
    videos?: any;
    description: string;
    dateModify: string;
    listTag: any[];
    numOfItems: number;
}

export interface ITopic {
    title: string;
    key: string;
    backgroundColor: string;
    description: string;
    coverImageURL: string;
    thumbURL: string;
}

export interface IArtist5 {
    artistId: number;
    name: string;
    shortLink: string;
    imageUrl: string;
}

export interface IListPlaylist {
    key: string;
    title: string;
    thumbnail: string;
    duration: string;
    artists: IArtist5[];
    type: string;
    dateRelease: number;
    dateCreate: any;
    uploadBy?: any;
    provider?: any;
    refMapping: any[];
    genreKey: string;
    songs?: any;
    videos?: any;
    description: string;
    dateModify: string;
    listTag: any[];
    numOfItems: number;
}

export interface ITopicEvent {
    groupName: string;
    listPlaylist: IListPlaylist[];
}

export interface IArtist6 {
    artistId: number;
    name: string;
    shortLink: string;
    imageUrl: string;
}

export interface IVideo {
    key: string;
    title: string;
    thumbnail: string;
    duration: string;
    artists: IArtist6[];
    type: string;
    dateRelease: any;
    dateCreate: any;
    uploadBy?: any;
    provider?: any;
    isMyPlaylist: boolean;
    statusViewValue: number;
    statusPlayValue: number;
    statusDownloadValue: number;
    statusAddPlaylistValue: number;
    refMapping: any[];
    genreKey: string;
    streamUrls: any[];
}
