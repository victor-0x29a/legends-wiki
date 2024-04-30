import { Box, Heading } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { LegendsSize } from '../../styles/constants.style';

type IEntityFormSectionsProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (value: any) => void,
    value: string,
    isLoading?: boolean
}

export const EntityFormSections = ({
    onChange,
    value,
    isLoading = false
}: IEntityFormSectionsProps) => {
    return (
        <Box>
            <Heading size={"md"} marginTop={LegendsSize.margin.normal} marginBottom={LegendsSize.margin.small}>
                Seções
            </Heading>
            {!isLoading && (
                <MDEditor onChange={onChange} value={value} />
            )}
        </Box>
    )
}
