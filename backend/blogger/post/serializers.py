from rest_framework import serializers
from .models import Blog, Comment

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = Comment
        fields = ["id","blog_id", "username", "comment_data",  "reply_id", "blog_id","replies",]

    def get_replies(self, obj):
        # print(help(obj))
        serializer = CommentSerializer(
            instance=obj.comment_set.all(),
            many=True
        )
        return serializer.data

class BlogSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    comments = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'date_added', 'comments']
        
    def get_comments(self, obj):
        serializer = CommentSerializer(
            instance=obj.comment_set.all(),
            many=True)
        return serializer.data
