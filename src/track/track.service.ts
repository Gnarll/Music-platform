import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Track, TrackDocument } from 'src/schemas/track.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}
  async create(dto: CreateTrackDto): Promise<Track> {
    const track = await this.TrackModel.create({ ...dto, listens: 0 });
    return track;
  }
  async getAll(): Promise<Track[]> {
    const tracks = await this.TrackModel.find();
    return tracks;
  }
  async getOne(id: ObjectId) {
    const track = await this.TrackModel.findById(id).populate('comments');
    return track;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.TrackModel.findByIdAndDelete(id);
    return track.id;
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.TrackModel.findById(dto.trackId);
    const comment = await this.CommentModel.create({ ...dto });
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }
}
