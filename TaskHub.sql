USE [TaskHub]
GO
/****** Object:  Table [dbo].[th_BP]    Script Date: 23/04/2020 5:36:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_BP](
	[BPCode] [int] NOT NULL,
	[BPName] [varchar](50) NULL,
	[ListId] [int] NULL,
	[Descrip] [varchar](100) NULL,
	[Active] [int] NULL,
	[ObjType] [int] NULL,
	[Completed] [int] NULL,
	[Prio] [varchar](20) NULL,
	[StatId] [int] NULL,
	[DateSubmitted] [date] NULL,
	[DateStarted] [date] NULL,
	[DateDue] [date] NULL,
	[DateDone] [datetime] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_BP] PRIMARY KEY CLUSTERED 
(
	[BPCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_Folders]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_Folders](
	[FolderId] [int] IDENTITY(1,1) NOT NULL,
	[FolderName] [varchar](30) NOT NULL,
	[Active] [int] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_Folders] PRIMARY KEY CLUSTERED 
(
	[FolderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_Lists]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_Lists](
	[ListId] [int] IDENTITY(1,1) NOT NULL,
	[ListName] [varchar](50) NULL,
	[FolderId] [int] NULL,
	[Active] [int] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_Lists] PRIMARY KEY CLUSTERED 
(
	[ListId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_ListUsers]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_ListUsers](
	[ListId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[Typ] [varchar](20) NOT NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_ListUsers] PRIMARY KEY CLUSTERED 
(
	[ListId] ASC,
	[UserId] ASC,
	[Typ] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logFolders]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logFolders](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[FolderId] [int] NULL,
	[FolderName] [varchar](50) NULL,
	[Typ] [varchar](30) NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logFolders] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logLists]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logLists](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[ListId] [int] NULL,
	[ListName] [varchar](50) NULL,
	[FolderId] [int] NULL,
	[ActionType] [varchar](30) NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logLists] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logListUsers]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logListUsers](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[ListId] [int] NULL,
	[UserId] [int] NULL,
	[Typ] [varchar](20) NULL,
	[ActTyp] [varchar](20) NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logListUsers] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logStatuses]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logStatuses](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[ListId] [int] NOT NULL,
	[StatId] [int] NOT NULL,
	[StatName] [varchar](50) NULL,
	[Typ] [varchar](20) NULL,
	[ActionTyp] [varchar](30) NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logStatuses] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logTasks]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logTasks](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[Typ] [varchar](30) NULL,
	[StatId] [int] NULL,
	[TaskId] [int] NULL,
	[TaskName] [varchar](50) NULL,
	[Descrip] [varchar](100) NULL,
	[Completed] [int] NULL,
	[Prio] [varchar](30) NULL,
	[DateStarted] [datetime] NULL,
	[DateDue] [datetime] NULL,
	[DateCompleted] [datetime] NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logTasks] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logTeams]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logTeams](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[TeamId] [int] NULL,
	[TeamName] [varchar](50) NULL,
	[Typ] [varchar](30) NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logTeams] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_logUsers]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_logUsers](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[LogDate] [datetime] NULL,
	[TeamId] [int] NULL,
	[EmpCode] [varchar](30) NULL,
	[Typ] [varchar](30) NULL,
	[LogBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_logUsers] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_Statuses]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_Statuses](
	[ListId] [int] NOT NULL,
	[StatId] [int] NOT NULL,
	[StatName] [varchar](20) NULL,
	[Typ] [varchar](20) NULL,
	[Active] [int] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_th_Statuses] PRIMARY KEY CLUSTERED 
(
	[ListId] ASC,
	[StatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_Tasks]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_Tasks](
	[ListId] [int] NOT NULL,
	[StatId] [int] NULL,
	[TaskId] [int] IDENTITY(1,1) NOT NULL,
	[TaskName] [varchar](50) NOT NULL,
	[Descrip] [varchar](100) NULL,
	[Active] [int] NULL,
	[Completed] [int] NULL,
	[Prio] [varchar](20) NULL,
	[DateStarted] [date] NULL,
	[DateDue] [date] NULL,
	[DateCompleted] [datetime] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
 CONSTRAINT [PK_th_Tasks] PRIMARY KEY CLUSTERED 
(
	[TaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_Teams]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_Teams](
	[TeamId] [int] IDENTITY(1,1) NOT NULL,
	[TeamName] [varchar](50) NULL,
	[Active] [int] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
	[ObjTyp] [int] NULL,
 CONSTRAINT [PK_th_Teams] PRIMARY KEY CLUSTERED 
(
	[TeamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[th_Users]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[th_Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[EmpCode] [varchar](30) NULL,
	[TeamId] [int] NULL,
	[Active] [int] NULL,
	[DateCreated] [datetime] NULL,
	[CreatedBy] [varchar](30) NULL,
	[ObjTyp] [int] NULL,
 CONSTRAINT [PK_th_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_th_Users] UNIQUE NONCLUSTERED 
(
	[EmpCode] ASC,
	[TeamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[th_BP] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_BP] ADD  DEFAULT ((300)) FOR [ObjType]
GO
ALTER TABLE [dbo].[th_BP] ADD  DEFAULT ((1)) FOR [Completed]
GO
ALTER TABLE [dbo].[th_BP] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_Folders] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_Folders] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_Lists] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_Lists] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_ListUsers] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_logFolders] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_logLists] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_logListUsers] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_logStatuses] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_logTasks] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_logTeams] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_logUsers] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[th_Statuses] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_Statuses] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_Tasks] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_Tasks] ADD  DEFAULT ((0)) FOR [Completed]
GO
ALTER TABLE [dbo].[th_Tasks] ADD  DEFAULT ('LOW') FOR [Prio]
GO
ALTER TABLE [dbo].[th_Tasks] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_Teams] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_Teams] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_Teams] ADD  DEFAULT ((20)) FOR [ObjTyp]
GO
ALTER TABLE [dbo].[th_Users] ADD  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[th_Users] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[th_Users] ADD  DEFAULT ((10)) FOR [ObjTyp]
GO
/****** Object:  StoredProcedure [dbo].[sp_thFolders]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_thFolders]
	@empcode varchar(30)
AS
BEGIN
	SELECT t0.FolderId, t0.FolderName, t1.EmpName CreatedBy, t0.DateCreated,
		ISNULL(t2.Lists,0) Lists, ISNULL(t3.Tasks,0) Tasks, ISNULL(t3.High,0) High,
		ISNULL(t3.Normal,0) Normal, ISNULL(t3.Low,0) Low
	FROM dbo.th_Folders t0
	INNER JOIN dbo.SCEmpNew t1 ON t1.EmpCode = t0.CreatedBy
	LEFT JOIN (
		SELECT t0.FolderId,COUNT(1) Lists FROM dbo.th_Lists t0 WHERE t0.Active = 1 GROUP BY t0.FolderId
	) t2 ON t2.FolderId = t0.FolderId
	LEFT JOIN (
		SELECT t0.FolderId,COUNT(1) Tasks, SUM(CASE WHEN t1.Prio='LOW' THEN 1 ELSE 0 END) Low, 
			SUM(CASE WHEN t1.Prio='NORMAL' THEN 1 ELSE 0 END) Normal,
			SUM(CASE WHEN t1.Prio='HIGH' THEN 1 ELSE 0 END) High 
		FROM dbo.th_Lists t0 INNER JOIN dbo.th_Tasks t1 ON t1.ListId = t0.ListId
		WHERE t0.Active = 1 AND t1.Active = 1 and t1.Completed = 0 GROUP BY t0.FolderId
	) t3 ON t3.FolderId = t0.FolderId
	WHERE t0.Active	= 1 AND t0.CreatedBy = @empcode
END
GO
/****** Object:  StoredProcedure [dbo].[sp_thLists]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_thLists]
	@folderid INT
AS
BEGIN
	SELECT t0.ListId,t0.ListName, ISNULL(t2.Tasks,0) Tasks, ISNULL(t2.High,0) High,
		ISNULL(t2.Normal,0) Normal, ISNULL(t2.Low,0) Low, ISNULL(t3.Users,0) Users, t0.DateCreated, t1.EmpName
	FROM dbo.th_Lists t0 
	INNER JOIN dbo.SCEmpNew t1 ON t1.EmpCode = t0.CreatedBy 
	LEFT JOIN (
		SELECT t0.ListId, COUNT(1) Tasks, SUM(CASE WHEN t0.Prio='LOW' THEN 1 ELSE 0 END) Low, 
			SUM(CASE WHEN t0.Prio='NORMAL' THEN 1 ELSE 0 END) Normal,
			SUM(CASE WHEN t0.Prio='HIGH' THEN 1 ELSE 0 END) High
		FROM dbo.th_Tasks t0 WHERE t0.Active = 1 AND t0.Completed = 0 GROUP BY t0.ListId
	) t2 ON t2.ListId = t0.ListId
	LEFT JOIN (
		SELECT t0.ListId, COUNT(1) Users FROM dbo.th_ListUsers t0 GROUP BY t0.ListId
	) t3 ON t3.ListId = t0.ListId
	WHERE t0.Active = 1 AND t0.FolderId = @folderid 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_thStatuses]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_thStatuses]
	@listid INT
AS
BEGIN
	SELECT t0.StatId, t0.StatName, t0.ListId, t0.Typ, SUM(CASE WHEN t2.TaskId IS NULL THEN 0 ELSE 1 END) Tasks, t0.DateCreated, t1.EmpName CreatedBy 
	FROM dbo.th_Statuses t0 
	INNER JOIN dbo.SCEmpNew t1 ON t1.EmpCode = t0.CreatedBy 
	LEFT JOIN dbo.th_Tasks t2 ON t2.ListId = t0.ListId AND t2.StatId = t0.StatId AND t2.Active = 1
	WHERE t0.Active = 1 AND t0.ListId = @listid
	GROUP BY t0.StatId,t0.StatName,t0.ListId,t0.Typ,t0.DateCreated,t1.EmpName
END
GO
/****** Object:  StoredProcedure [dbo].[sp_thTasks]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_thTasks]
	@listid INT
AS
BEGIN
	SELECT t0.ListId, t0.StatId, t0.TaskId, t0.TaskName, ISNULL(t0.Descrip,'') Descrip, t0.Completed, t0.Prio, t0.DateStarted, t0.DateDue, t0.DateCompleted, t0.DateCreated, t1.EmpName CreatedBy
	FROM dbo.th_Tasks t0
	INNER JOIN dbo.SCEmpNew t1 ON t1.EmpCode = t0.CreatedBy
	WHERE t0.Active = 1 AND t0.Completed = 0 AND t0.ListId = @listid
END

GO
/****** Object:  StoredProcedure [dbo].[sp_thTeams]    Script Date: 23/04/2020 5:36:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_thTeams]
	@empcode varchar(30)
AS
BEGIN
	SELECT t0.TeamId, t0.TeamName, t1.EmpName CreatedBy, t0.DateCreated, 	
		SUM(CASE WHEN t2.EmpCode IS NOT NULL THEN 1 ELSE 0 END) Users 
	FROM dbo.th_Teams t0 
	INNER JOIN dbo.SCEmpNew t1 ON t1.EmpCode = t0.CreatedBy 
	LEFT JOIN dbo.th_Users t2 ON t2.TeamId = t0.TeamId AND t2.Active = 1 
	WHERE t0.Active = 1 AND t0.CreatedBy = @empcode
	GROUP BY t0.TeamId, t0.TeamName, t1.EmpName, t0.DateCreated
END
GO
