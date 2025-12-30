import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AddCircleOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextareaAutosize,
  Typography,
  useTheme,
} from '@mui/material';
import { SearchForm, Select } from '@sql/sql-libs/src/components';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import * as _ from 'lodash-es';
import ItemQuestion from './ItemQuestion';

export type SORT_QUESTION_SOLUTIOM = {
  order: number[];
  query: string;
};
type Props = {
  questionData: any;
  setQuestionData: Dispatch<SetStateAction<any>>;
  onCreateButtonClick: () => void;
};

type Component = {
  id: number;
  text: string;
  type: string;
};
function SortableItem({ component }: { component: Component }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };
  return (
    <Grid
      item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ display: 'flex' }}
    >
      <ItemQuestion
        value={component.text}
        name="đáp án"
        paperProps={{
          sx: {
            width: '140px',
          },
        }}
      />
    </Grid>
  );
}

export function CreateSortQuestion({
  questionData,
  setQuestionData,
  onCreateButtonClick,
}: Props): JSX.Element {
  const [listComponents, setListComponents] = useState<Component[]>([]);
  const [listAnsComponents, setListAnsComponents, getListAnsComponent] =
    useStateWithGetter<Component[]>([]);
  const [solution_data, setSolution_data] = useState<SORT_QUESTION_SOLUTIOM>({
    order: [],
    query: '',
  });
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionQuery, setQuestionQuery] = useState('');

  const sensors = useSensors(useSensor(PointerSensor));
  const updateSolutionData = () => {
    const orderIds = getListAnsComponent().map((c) => c.id);
    const query = _.map(getListAnsComponent(), (item) => item.text).join('');
    setSolution_data({
      order: orderIds,
      query: query,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = listAnsComponents.findIndex((c) => c.id === active.id);
      const newIndex = listAnsComponents.findIndex((c) => c.id === over.id);
      setListAnsComponents((items) => arrayMove(items, oldIndex, newIndex));
      updateSolutionData();
    }
  };

  const handleDeleteItemQuestion = (id: number) => {
    setListComponents((prev) => prev.filter((item) => item.id !== id));
    setListAnsComponents((prev) => prev.filter((item) => item.id !== id));
    updateSolutionData();
  };
  const handleCreateQuestion = () => {
    setQuestionData({
      type: 'sql',
      order_index: 1,
      title: questionTitle,
      details: {
        interaction_type: 'drag_drop',
        description: questionQuery,
        question_data: {
          prompt: 'Liệt kê tên lớp và số SV nam/nữ trong mỗi lớp.',
          components: listComponents,
        },
      },
      solution_data: solution_data,
    });
    onCreateButtonClick();
  };
  return (
    <>
      <ItemQuestion
        name="mô tả câu hỏi"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
      />
      <ItemQuestion
        name="câu hỏi"
        value={questionQuery}
        onChange={(e) => setQuestionQuery(e.target.value)}
        paperProps={{
          sx: {
            minHeight: '100px',
          },
        }}
      />
      <Stack>
        <Grid
          container
          alignItems="stretch"
          justifyContent="center"
          spacing={1}
        >
          {_.map(listComponents, (component: Component, index: number) => (
            <Grid item sx={{ display: 'flex' }}>
              <ItemQuestion
                value={component.text}
                name="đáp án"
                onDelete={() => handleDeleteItemQuestion(component.id)}
                onChange={(e) => {
                  const newList = [...listComponents];
                  newList[index].text = e.target.value;
                  setListComponents(newList);
                  setListAnsComponents((prev) =>
                    prev.map((item, idx) =>
                      component.id === item.id
                        ? { ...item, text: e.target.value }
                        : item
                    )
                  );
                }}
                paperProps={{
                  sx: {
                    width: '140px',
                  },
                }}
              />
            </Grid>
          ))}
          <Grid item>
            <IconButton>
              <AddCircleOutlined
                onClick={() => {
                  const newItem = {
                    id: listComponents.length,
                    text: '',
                    type: '',
                  };
                  setListComponents(_.concat(listComponents, newItem));
                  setListAnsComponents(_.concat(listAnsComponents, newItem));
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Typography>Đáp án đúng</Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={listAnsComponents.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <Grid
              container
              alignItems="stretch"
              justifyContent="center"
              spacing={1}
            >
              {listAnsComponents.map((component) => (
                <SortableItem key={component.id} component={component} />
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
        <Stack alignItems="center">
          <Button
            onClick={handleCreateQuestion}
            variant="contained"
            sx={{ width: '130px', mx: 'auto', pt: 2 }}
            disabled={
              listComponents.length <= 1 || _.some(listComponents, { text: '' })
            }
          >
            Tạo câu hỏi
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
