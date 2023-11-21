declare namespace Express {
	export type Request = {
		user?: any;
    file?: Multer.File;
    files?: Multer.File[];
	};
}
